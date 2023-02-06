import { GithubUser } from "./GithubUser.js"

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username) {
        try {
         const userExists = this.entries.find(entry => entry.login === username)

         if(userExists) {
            throw new Error('Usuário já cadastrado!')
         }

         const user = await GithubUser.search(username)

         if(user.login === undefined) {
            throw new Error('Usuário não encontrado!')
         }
         

         this.entries = [user, ...this.entries]
         this.update()
         this.save()
        } catch(error) {
        alert(error.message)
        }
    }

     delete(user) {
        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)
         
        if([].length === 0){
            const star = document.querySelectorAll(".p")
    
            star.forEach(pElement => {
                pElement.classList.remove("hide");
            });
         }
        this.entries = filteredEntries
        this.update()
        this.save()
    }
}



export class FavoritesView extends Favorites {
    constructor(root){
        super(root) 
        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onAdd()
    }
    
    onAdd(){
            const addButton = this.root.querySelector('.search button')
    
    
            addButton.onclick = () => {
                const {value} = this.root.querySelector('.search input')
    
                this.add(value)
            }
            
    
    }
    
    update(){
        this.removeAlltr()
        
        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers


            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem certeza que deseja deletar essa linha?');
                if(isOk){
                    this.delete(user)
                }
            }

            
            if(this.entries = this.entries){
                const starHide = document.querySelectorAll(".p")
    
                starHide.forEach(pElement => {
                    pElement.classList.add("hide");
                });
            } 

            this.tbody.append(row)
        })
    }

    createRow(){
         const tr = document.createElement('tr')


        tr.innerHTML = `
        <td>
            <div class="user">
            <img src="https://github.com/maykbrito.png" alt="Imagem de Mayk Brito">
                <a href="https://github.com/maykbrito" target="_blank">
                    <p>Mayk Brito</p>
                    <span>maykbrito</span>
                </a>
            </div>
        </td>
        <td class="repositories">
            123
        </td>
        <td class="followers">
            1234
        </td>
        <td>
            <button class="remove">Remover</button>
        </td>
        `



        return tr
    }

    removeAlltr(){
        this.tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        });
        
    }
}

// código para aparecer estrela 
// if(this.entries = []){
//     const favoritesDow = document.querySelectorAll(".p")
        
//         favoritesDow.forEach(pElement => {
//             pElement.classList.remove("hide");
//         });
//     }


            // if(this.entries = this.entries){
            // const favoritesDow = document.querySelectorAll(".p")

            // this.favoritesDow.forEach(pElement => {
            //     pElement.classList.add("hide");
            // });
            // } 