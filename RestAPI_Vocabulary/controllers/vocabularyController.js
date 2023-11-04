const { Vocabulary } = require("../model/model");

const vocabularyController = {
    addVocabulary: async (req, res) => {
        try {
            const newVocabulary = new Vocabulary(req.body);
            const saveDB = await newVocabulary.save();
            res.status(200).json(saveDB);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllVocabulary: async (req, res) => {
        try {
            const vocabularies = await Vocabulary.find();
            res.status(200).json(vocabularies);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    getVocabulary: async (req, res) => {
        try {
            const vocabularies = await Vocabulary.findById(req.params.id)
            res.status(200).json(vocabularies);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateVocabulary: async (req, res) => {
        try {
            const vocabularies = await Vocabulary.findById(req.params.id);
            await vocabularies.updateOne({ $set: req.body });
            res.status(200).json('Updated successfully!');

        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteVocabulary: async (req, res) => {
        try {
            const vocabularies = await Vocabulary.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted successfully!');

        } catch (err) {
            res.status(500).json(err);
        }
    },

};
module.exports = vocabularyController;