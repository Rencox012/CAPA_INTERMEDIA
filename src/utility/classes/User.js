
export class User {
    constructor(uid, foto,  name, apellidos, genero, Direccion, email, contrasena, rol, activo) {
        this.uid = uid;
        this.email = email;
        this.name = name;
        this.apellidos = apellidos;
        this.foto = foto;
        this.genero = genero;
        this.direccion = Direccion;
        this.contrasena = contrasena;
        this.rol = rol;
        this.activo = activo;
    }

   
    // Convert a base64 string to a blob
    static base64ToBlob(base64) {
        const byteString = atob(base64.split(',')[1]);
        const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    static save(user) {
      
        localStorage.setItem('user', JSON.stringify(user));
    }

    static load() {
        const userData = localStorage.getItem('user');
        if (userData) {
            //return the user object
            return JSON.parse(userData);
        }
        return null;
    }

    static GetUID() {
        const user = User.load();
        if (user) {
            return user.uid;
        }
        return null;
    }

    static clear() {
        localStorage.removeItem('user');
    }
}