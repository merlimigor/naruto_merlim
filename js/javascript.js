
const listLeaf = document.querySelector("#leaf");

var btn = document.querySelector('.botao');
var container = document.querySelector('.leaf');

btn.addEventListener('click', function() {
        
    if(container.style.display === 'block') {
        container.style.display = 'none';
    } else {
        container.style.display = 'block';
    }
        
});


async function requestApi(query){
    let response = await fetch(`https://narutoql.up.railway.app/graphql/?query=${query}`)

    response = await response.json()

    return response.data 
}

function main(){
    const characters = 
    `{
        characters(filter: {village: "leaf"})  {
            info{
                count
                next
            }
                results {
                    name
                    age
                    avatarSrc
                    description
                    village
                    nameMeaning
                }
        }
    }`

    requestApi(characters).then(res => showCharacters(res))
}
function getOneCaracter(id = 10){
    const query = 
    `{
        character(id: "61bd1dbc918f12c17b9c6483")
         {
            name
            description
            village
            weight {
                minimum
                maximum
            }
            height {
                minimum
                maximum
            }
            maxHP
            resistant
        }
    }`
    requestApi(query).then(res => showCharacter(res))
}

function showCharacters(characters){
    const naruto= characters.characters.results
    console.log(characters.characters.results)
    let template = ''

    naruto.forEach(
        character =>
        (template += `
            <li class="media">
                <img class="mr-3" width="100" src="${character.avatarSrc}"></img>
                    <div class="media-body">
                        <h5>${character.name}</h5>
                        <p> Idade:${character. age}</p>
                        <p> Descrição:${character.description}</p>
                    </div>
            </li>
        `)
        )

        listLeaf.innerHTML = `
        <ul class="list-unstyled">
            ${template}
        </ul>
    `
}

main()

