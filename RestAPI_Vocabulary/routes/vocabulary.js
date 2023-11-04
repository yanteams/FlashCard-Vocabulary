const vocabularyController = require("../controllers/vocabularyController");

const router = require("express").Router();

router.get("/:vocabulary", vocabularyController.getVocabularyByVocabulary);
router.post("/", vocabularyController.addVocabulary);
router.get("/", vocabularyController.getAllVocabulary);
router.put("/:vocabulary", vocabularyController.updateVocabulary);
router.delete("/:vocabulary", vocabularyController.deleteVocabulary);
module.exports = router;