"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, createUserWithEmailAndPassword } from "@/lib/firebase";

export default function Kayit() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("customer");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // Burada accountType bilgisini de kullanarak kullanıcı oluşturulacak
      await createUserWithEmailAndPassword(auth, email, password);
      // localStorage'a accountType bilgisini kaydet
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify({ email, accountType }));
        localStorage.setItem("isLoggedIn", "true");
      }
      router.push("/giris"); // Kayıt başarılıysa giriş sayfasına yönlendir
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Kayıt Ol</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Şifre (en az 6 karakter)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="accountType"
              value="customer"
              checked={accountType === "customer"}
              onChange={() => setAccountType("customer")}
            />
            Müşteri
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="accountType"
              value="venue"
              checked={accountType === "venue"}
              onChange={() => setAccountType("venue")}
            />
            Mekan Sahibi
          </label>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Kayıt Ol</button>
      </form>
    </div>
  );
}
