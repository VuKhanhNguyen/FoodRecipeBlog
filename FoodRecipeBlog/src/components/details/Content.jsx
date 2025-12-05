import React from "react";
import EntryContent from "./EntryContent";
import recipe1 from "../../assets/img/recipe/1.jpg";

const Content = () => {
  // Dữ liệu giả định - khớp với format từ SubmitBlogRecipePage
  const recipeData = {
    recipeName: "Bánh Mì Thịt Nướng Siu Chèf",
    category: "Bữa sáng",
    description:
      "<p>Món <strong>bánh mì thịt nướng</strong> truyền thống Việt Nam với hương vị đặc trưng. Thịt nướng thơm phức, bánh mì giòn rụm kết hợp với rầu sống tươi ngon tạo nên món ăn <em>hấp dẫn</em> cho bữa sáng hoặc bữa trưa.</p><p>Công thức này được truyền từ nhiều thế hệ và đã được cải tiến để phù hợp với khẩu vị hiện đại.</p>",
    prepTime: "30",
    cookTime: "45",
    servings: "4",
    calories: "450",
    difficulty: "medium",
    ingredients: [
      "500g thịt ba chỉ hoặc thịt vai",
      "4 đôi bánh mì Việt Nam",
      "2 muỗng canh sốt tương",
      "2 muỗng canh mật ong",
      "3 tép tỏi băm",
      "1 muỗng canh dầu hào",
      "Rầu sống (xà lách, dưa leo, cà rốt, ngò)",
      "Pa-tê gan tùy ý",
      "ớt, tiêu, đường",
      "Xì dầu, nước măm",
    ],
    directions: [
      "<p><strong>Chuẩn bị thịt:</strong> Thái thịt thành lát mỏng vừa phải. Ước thịt với sốt tương, mật ong, tỏi băm, dầu hào, xì dầu, đường, tiêu trong 2 giờ.</p>",
      "<p><strong>Nướng thịt:</strong> Đun nóng chảo hoặc vỉ nướng. Nướng thịt trên lửa vừa đến khi 2 mặt thịt chín vàng đều, khoảng 5-7 phút mỗi mặt.</p>",
      "<p><strong>Chuẩn bị bánh mì:</strong> Rạch dọc bánh mì, nướng lò hoặc chảo cho giòn. Bôi pa-tê vào trong bánh.</p>",
      "<p><strong>Lắp ráp:</strong> Xếp thịt nướng vào bánh, thêm rầu sống, dưa leo, cà rốt thái lát. Rưới thêm chút nước măm pha loãng và tương ớt nếu thích매운.</p>",
      "<p><strong>Thưởng thức:</strong> Ăn nóng ngay khi vừa làm xong để cảm nhận hương vị <em>ngon nhất</em>!</p>",
    ],
    tags: "món Việt, bánh mì, bữa sáng, dễ làm, tiết kiệm",
    recipeImage: recipe1,
    author: "Chef Michel",
    comments: 12,
    rating: 4.5,
    date: { day: "25", month: "Dec" },
  };

  return (
    <div className="metro_post-single-wrapper metro_recipe-single-wrapper">
      <h2 className="entry-title">{recipeData.recipeName}</h2>

      <div className="metro_rating-wrapper">
        <div className="metro_rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fa fa-star ${
                star <= Math.floor(recipeData.rating) ? "active" : ""
              }`}
            ></i>
          ))}
        </div>
        <span>{recipeData.rating} Stars</span>
      </div>

      <div className="metro_post-single-thumb">
        <img src={recipeData.recipeImage} alt={recipeData.recipeName} />
        <div className="metro_post-date">
          <span>{recipeData.date.day}</span>
          <span>{recipeData.date.month}</span>
        </div>
      </div>

      {/* Entry Content Component - truyền data xuống */}
      <EntryContent recipeData={recipeData} />
    </div>
  );
};

export default Content;
