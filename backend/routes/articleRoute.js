import express from "express"
import Article from "../models/Article.js"

const router=express.Router();

router.post("/",async(req,res)=>{
      const article=await Article.create(req.body);
      res.json(article);
})

router.get("/",async(req,res)=>{
      const articles=await Article.find();
      res.json(articles);
})

router.get("/:id",async(req,res)=>{
      const article=await Article.findById(req.params.id);
      res.json(article);
})

router.put("/:id",async(req,res)=>{
      const article=await Article.findByIdAndUpdate(req.params.id,req.body,{new:true});
      res.json(article);
})

router.delete("/:id",async(req,res)=>{
      await Article.findByIdAndDelete(req.params.id);
      res.json({message:"Article deleted"});
})


export default router;