const vocabularyController = require("../controllers/vocabularyController");

const router = require("express").Router();


router.post("/", vocabularyController.addVocabulary);
router.get("/", vocabularyController.getAllVocabulary);
router.get("/:id", vocabularyController.getVocabulary);
router.put("/:id", vocabularyController.updateVocabulary);
router.delete("/:id", vocabularyController.deleteVocabulary);
module.exports = router;