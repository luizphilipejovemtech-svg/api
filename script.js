const url = 'https://store.steampowered.com/api/appdetails?appids=&cc=br&l=portuguese'
const characterId = document.getElementById('characterId')
const content = document.getElementById('content')
const btnGO = document.getElementById('btn-go')
const image = document.getElementById('img')




const chamarApi = async (value) => {
    const resp = await fetch(`https://store.steampowered.com/api/appdetails?appids=${value}&cc=br&l=portuguese`)
    const data =await resp.json()
    console.log(data)
    return data;
}

btnGO.addEventListener('click', async (event) => {
    event.preventDefault();
    const appId = characterId.value.trim();
    if (!appId) {
        content.textContent = "Digite um App ID válido.";
        return;
    }

    try {
        const resp = await chamarApi(appId);
        const appData = resp[appId];
        if (appData && appData.success) {
            content.textContent = `Nome: ${appData.data.name}`;
            image.src = appData.data.header_image;
        } else {
            content.textContent = "App não encontrado.";
            image.src = "";
        }
    } catch (error) {
        content.textContent = "Erro ao buscar dados.";
        console.error(error);
    }
});
