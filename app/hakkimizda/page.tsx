"use client";

export default function HakkimizdaPage() {
  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-rose-600">Hakkımızda</h1>
      <p className="mb-4 text-lg text-gray-700">
        <b>FavPlace</b>, Isparta’daki mekanları ve etkinlikleri tek bir platformda buluşturan kapsamlı bir rehberdir. Amacımız, şehirdeki en güncel etkinlikleri ve en popüler mekanları kolayca keşfetmenizi sağlamak, hem ziyaretçilere hem de mekan sahiplerine dijital bir buluşma noktası sunmaktır.
      </p>
      <p className="mb-4 text-gray-700">
        Kullanıcılar, ilgi alanlarına göre mekanları ve etkinlikleri favorilerine ekleyebilir, puanlayabilir ve yorum yapabilir. Mekan sahipleri ise kendi mekanlarını ve etkinliklerini kolayca yönetebilir, menülerini güncelleyebilir ve şehirdeki potansiyel müşterilere ulaşabilir.
      </p>
      <p className="mb-4 text-gray-700">
        <b>FavPlace</b> ile Isparta’nın sosyal hayatını dijital ortamda keşfedin, yeni deneyimler yaşayın ve şehrin en iyi noktalarını kaçırmayın!
      </p>
      <div className="mt-8 text-sm text-gray-500">Tüm hakları saklıdır. &copy; {new Date().getFullYear()} FavPlace</div>
    </div>
  );
} 