import express from "express"
import { addSchool, listSchools } from "./school.controllers.js"

const router = express.Router()

router.post("/addSchool", addSchool)
router.get("/listSchools", listSchools)

export default router