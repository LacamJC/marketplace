const campoVAL = document.getElementById("validadeProduto")


campoVAL.addEventListener("keypress", () =>
{
    let pos_caractere = campoVAL.value.length;

    if(pos_caractere == 4)
    {
        campoVAL.value += "-"
    }

    if(pos_caractere == 7)
    {
        campoVAL.value += "-"
    }

    
})

