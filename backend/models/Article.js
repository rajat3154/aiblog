import mongoose from "mongoose";

const articleSchema=new mongoose.Schema(
      {
            title:String,
            content:String,
            url:String,
            updated_content:String,  
            references: [String],  
      },
      {timestamps:true}
)

const Article=mongoose.model("Article",articleSchema);
export default Article;