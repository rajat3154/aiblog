import { useEffect, useState } from "react";
import { fetchArticles } from "./api";
import ArticleCard from "./ArticleCard"
import "./index.css"; 

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((res) => setArticles(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 animate-pulse">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black w-full p-6 md:p-10">
      <div className="space-y-8">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default App;