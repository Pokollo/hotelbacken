import multer from "multer";
import path from "path"

const storage = multer.diskStorage({

    destination:(req, file, cb)=>{
        cb(null, "C:/Users/karit/OneDrive/Desktop/javaScript projects/hotel/front/public/img");
    },
    filename:(req, file, cb)=>{
        const extension = path.extname(file.originalname);

        const nombre = Date.now()+extension;

        cb(null, nombre);
    }
});

const upload = multer({
    storage:storage
});

export default upload;