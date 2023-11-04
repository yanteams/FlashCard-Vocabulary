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
            const vocabulary = await Vocabulary.findOne({ vocabulary: req.params.vocabulary });
            res.status(200).json(vocabulary);

        } catch (err) {
            res.status(500).json(err);
        }
    },
   updateVocabulary: async (req, res) => {
        try {
            const vocabulary = await Vocabulary.findOne({ vocabulary: req.params.vocabulary });
            if (!vocabulary) {
                return res.status(404).json('Vocabulary not found');
            }
            await vocabulary.updateOne({ $set: req.body });
            res.status(200).json('Updated successfully!');

        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteVocabulary: async (req, res) => {
        try {
            const vocabulary = await Vocabulary.findOneAndDelete({ vocabulary: req.params.vocabulary });
            if (!vocabulary) {
                return res.status(404).json('Vocabulary not found');
            }
            res.status(200).json('Deleted successfully!');

        } catch (err) {
            res.status(500).json(err);
        }
    },

};

const getVocabularyByVocabulary = async (req, res) => {
    try {
        const vocabulary = await Vocabulary.findOne({ vocabulary: req.params.vocabulary });

        if (!vocabulary) {
            return res.status(404).json({ message: "Từ vựng không tồn tại" });
        }

        res.json(vocabulary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addVocabulary: vocabularyController.addVocabulary,
    getAllVocabulary: vocabularyController.getAllVocabulary,
    getVocabulary: vocabularyController.getVocabulary,
    updateVocabulary: vocabularyController.updateVocabulary,
    deleteVocabulary: vocabularyController.deleteVocabulary,
    getVocabularyByVocabulary: getVocabularyByVocabulary
};