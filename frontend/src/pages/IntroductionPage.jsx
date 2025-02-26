import React from "react";

const IntroductionPage = () => {
  const handleBuyNow = () => {
    window.location.href = "/products"; // Chuyển hướng và reload trang
  };

  const handleJoinUs = () => {
    window.location.href = "/contact"; // Chuyển hướng và reload trang
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main>
        {/* Section 1: Introduction */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Câu chuyện của chúng tôi</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                  alt="Our Story"
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <p className="text-gray-600 leading-relaxed">
                  PVBook Shops là điểm đến lý tưởng cho những người yêu sách và văn hóa đọc. Chúng tôi không chỉ đơn thuần là một hiệu sách, mà còn là nơi kết nối cộng đồng, lan tỏa tri thức và nuôi dưỡng tình yêu đọc sách.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Section: Welcome Message */}
        <section className="py-16 bg-green-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Chào mừng đến với PVBook Shops!</h2>
            <p className="text-xl text-gray-700 mb-8">Khám phá thế giới tri thức cùng chúng tôi</p>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Ưu đãi đặc biệt</h3>
              <p className="text-gray-600 mb-6">Giảm 20% cho tất cả sách mới trong tháng này!</p>
              <button
                onClick={handleBuyNow} // Sử dụng window.location.href
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </section>

        {/* New Section: Knowledge Sharing */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Chia sẻ kiến thức</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Tham gia cộng đồng đọc sách</h3>
                <p className="text-gray-600 mb-4">
                  Tham gia các buổi thảo luận sách, chia sẻ góc nhìn và học hỏi từ những độc giả khác.
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300">
                  Tham gia ngay
                </button>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">Đóng góp bài viết</h3>
                <p className="text-gray-600 mb-4">
                  Chia sẻ những review sách, bài viết về sách và trải nghiệm đọc của bạn.
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300">
                  Viết bài ngay
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Community Impact */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Lan tỏa điều tốt và nhiều hơn nữa</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205"
                  alt="Community Impact"
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2 space-y-4">
                <p className="text-gray-600">
                  Chúng tôi tổ chức các hoạt động văn hóa đọc, giao lưu tác giả và các sự kiện cộng đồng.
                </p>
                <button
                  onClick={handleJoinUs} // Sử dụng window.location.href
                  className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition duration-300"
                >
                  Tham gia cùng chúng tôi
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Sustainability Promise */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-8">Phát triển bền vững</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600 mb-8">
                Chúng tôi cam kết sử dụng các phương pháp kinh doanh bền vững, thân thiện với môi trường và có trách nhiệm với xã hội.
              </p>
              <img
                src="https://images.unsplash.com/photo-1518156677180-95a2893f3e9f"
                alt="Sustainability"
                className="rounded-lg shadow-lg w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IntroductionPage;
