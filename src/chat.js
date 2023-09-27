const apikey = process.env.REACT_APP_API_KEY

const { Configuration, OpenAIApi, } = require("openai");
const embeddingsArray = require('./doc.json')
const configuration = new Configuration({
    apiKey: apikey,
});
const openai = new OpenAIApi(configuration);

let arrayMessages = []

export async function createChat(question) {
    try {
        let arrayContext = await searchReviews(question)
        let context = 'Actuar como directorio virtual de la empresa "El Asesor". Debe ofrecer información sólo si está explícitamente disponible para usted. Apto para Argentina.\nNo brinde información sobre ningún otro tema, si el usuario solicita información sobre cualquier otro tema no relacionado con la ciudad de Yerba buena, Argentina, debe amablemente responder "No puedo brindar información al respecto". Debe responder a datos estrictamente conocidos y decir "No sé" si no conoce un producto, servicio o empresa específica. Debe responder cada vez en el mismo idioma que la última pregunta de idioma del usuario. No mientas y sé respetuoso y servil en todo momento. \n'

        for (let obj of arrayContext) {
            context = context.concat(obj.text + "\n")
        }
        // console.log(context)
        let system = { role: "system", content: context }
        let user = { role: "user", content: question }

        for (let i = 0; i<arrayMessages.length; i++){
            if(arrayMessages[i].role === "system"){
                arrayMessages.splice(i, 1)
            }
        }

        arrayMessages.push(system)
        arrayMessages.push(user)
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo', //-0613
            messages: arrayMessages,
            temperature: 0,
        });
        const message = completion.data.choices[0].message
        arrayMessages.push(message)
        // console.log(message.content)
        return message

    } catch (error) {
        console.error(error);
        let objError = {
            role: "assistant",
            content: "Lo siento, estoy teniendo problemas de conexion, intenta mas tarde"
        }
        return objError
    }
}

//similitud de cosenos
function cosineSimilarity(a, b) {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;
    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        magnitudeA += a[i] * a[i];
        magnitudeB += b[i] * b[i];
    }
    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);
    return dotProduct / (magnitudeA * magnitudeB);
}
// obtener el embedding de una frase
async function getEmbedding(text) {
    const response = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: text
    });
    return response.data.data[0].embedding;
}
// responde con un arreglo los resultados mas parecidos
async function searchReviews(question, n = 4) {

    const embedding = await getEmbedding(question);
    embeddingsArray.forEach(obj => {
        obj.similarity = cosineSimilarity(obj.embeddings, embedding);
    });
    const res = embeddingsArray.sort((a, b) => b.similarity - a.similarity).slice(0, n);
    return res;
}
