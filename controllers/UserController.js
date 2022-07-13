import User from '../models/UserModel.js';

export const getAllUsers = async(req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json({ msg: "Akun berhasil dihapus!" });
    } catch (error) {
        res.status(400).json({ msg: "Akun gagal dihapus!" });
        console.log(error.message);
    }
}