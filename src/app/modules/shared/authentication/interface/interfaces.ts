export interface IUser {
    nome:string;
    login:string;
    foto:string;
 }
 
 export interface AutenticacaoModelView {
    nome: string;
    hora: Date;
    senha: string;
 }
 
 export interface MenuVM {
    label: string;
    routerLink: string;
    items: MenuVM[];
 }