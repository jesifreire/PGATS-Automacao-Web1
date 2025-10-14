//Criando minhas funcoes auxilixares
import {faker} from '@faker-js/faker'
export function getRandomNumber(){
    return faker.number.bigInt()
}
export function getRandomEmail(){
    return faker.internet.email({firstName: 'Eevee-qa'})
}