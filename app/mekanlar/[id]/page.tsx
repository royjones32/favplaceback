"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, ArrowLeft, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import VenueRating from "@/components/venue-rating"
import CommentSection from "@/components/comment-section"
import FavoriteButton from "@/components/favorite-button"
import MenuSection from "@/components/menu-section"

interface VenueDetailPageProps {
  params: {
    id: string
  }
}

export default function VenueDetailPage(params: VenueDetailPageProps) {
  const id = params?.params?.id;
  const [venue, setVenue] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    async function loadVenue() {
      try {
        // DUMMY_VENUES ve localStorage'daki myVenues'u birleştir
        const DUMMY_VENUES = [
          {
            id: "1",
            name: "Cafe Isparta",
            address: "Merkez, Isparta",
            phone: "0246 123 45 67",
            openingHours: "09:00 - 23:00",
            description: "Isparta'nın merkezinde şık bir kafe. Modern dekorasyonu, geniş menüsü ve samimi atmosferiyle misafirlerine keyifli anlar yaşatıyor. Kahve çeşitleri, tatlılar ve atıştırmalıklar sunan kafemiz, çalışmak veya arkadaşlarla buluşmak için ideal bir mekan.",
            imageUrl: "/placeholder.svg?height=400&width=800",
            rating: 4.5,
            ratingCount: 28,
            website: "https://cafeisparta.com",
            socialMedia: {
              instagram: "@cafeisparta",
              facebook: "CafeIsparta",
            },
            comments: [],
            upcomingEvents: [],
            menu: [],
            ownerEmail: "ahmet@example.com",
          },
          {
            id: "2",
            name: "Gül Restaurant",
            address: "Çünür, Isparta",
            phone: "0246 234 56 78",
            openingHours: "11:00 - 22:00",
            description: "Geleneksel lezzetlerin modern sunumu.",
            imageUrl: "/placeholder.svg?height=400&width=800",
            rating: 4.2,
            ratingCount: 42,
            website: "",
            socialMedia: {},
            comments: [],
            upcomingEvents: [],
            menu: [],
            ownerEmail: "ayse@example.com",
          },
        ];
        let myVenues = [];
        if (typeof window !== "undefined") {
          const myVenuesStr = localStorage.getItem("myVenues");
          if (myVenuesStr) {
            myVenues = JSON.parse(myVenuesStr);
          }
        }
        const allVenues = [...DUMMY_VENUES, ...myVenues];
        const venueData = allVenues.find((v) => v.id === id);
        if (!venueData) throw new Error("Mekan bulunamadı");
        setVenue(venueData);
        // Kullanıcı oturumu kontrolü
        if (typeof window !== "undefined") {
          const userInfoStr = localStorage.getItem("userInfo");
          if (userInfoStr) {
            const userInfo = JSON.parse(userInfoStr);
            setIsOwner(userInfo.email === venueData.ownerEmail);
          }
        }
      } catch (error) {
        console.error("Mekan yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadVenue();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="text-center py-12">Mekan bilgileri yükleniyor...</div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="container py-12">
        <div className="text-center py-12">Mekan bulunamadı.</div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/mekanlar">
          <Button variant="ghost" className="pl-0 flex items-center gap-2">
            <ArrowLeft size={16} />
            Mekanlara Dön
          </Button>
        </Link>
        <FavoriteButton id={id} type="venue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={venue.imageUrl || "/placeholder.svg"}
            alt={venue.name}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
          />

          <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>

          <div className="flex items-center mb-6">
            <VenueRating rating={venue.rating ?? 0} ratingCount={venue.ratingCount ?? 0} venueId={venue.id} />
          </div>

          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Detaylar</TabsTrigger>
              <TabsTrigger value="menu">Menü</TabsTrigger>
              <TabsTrigger value="events">Etkinlikler</TabsTrigger>
              <TabsTrigger value="comments">Yorumlar ({(venue.comments ?? []).length})</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Mekan Hakkında</h2>
                <p className="text-gray-700">{venue.description}</p>
              </div>

              {venue.website && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">İletişim</h2>
                  <p className="text-gray-700">
                    <a href={venue.website} target="_blank" rel="noopener noreferrer" className="text-rose-600">
                      {venue.website}
                    </a>
                  </p>
                  {venue.socialMedia && (
                    <div className="mt-2">
                      {venue.socialMedia.instagram && <p className="text-gray-700">{venue.socialMedia.instagram}</p>}
                      {venue.socialMedia.facebook && <p className="text-gray-700">{venue.socialMedia.facebook}</p>}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="menu">
              <MenuSection menu={venue.menu ?? []} venueId={venue.id} isOwner={isOwner} />
            </TabsContent>

            <TabsContent value="events">
              <h2 className="text-xl font-semibold mb-4">Yaklaşan Etkinlikler</h2>
              {venue.upcomingEvents && venue.upcomingEvents.length > 0 ? (
                <div className="grid gap-4">
                  {venue.upcomingEvents.map((event: any) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{event.title}</CardTitle>
                          <Badge>{new Date(event.date).toLocaleDateString("tr-TR")}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-5 w-5 text-gray-500 mr-2" />
                          <span>{event.time}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/etkinlikler/${event.id}`}>
                          <Button variant="outline">Detayları Gör</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Bu mekanda yaklaşan etkinlik bulunmuyor.</p>
              )}
            </TabsContent>

            <TabsContent value="comments">
              <CommentSection comments={venue.comments} itemId={venue.id} itemType="venue" />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg border mb-6">
            <h2 className="text-xl font-semibold mb-4">Mekan Bilgileri</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Adres</p>
                  <p className="text-gray-600">{venue.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Telefon</p>
                  <p className="text-gray-600">{venue.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Çalışma Saatleri</p>
                  <p className="text-gray-600">{venue.openingHours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-rose-50 p-6 rounded-lg border">
            {isOwner && (
              <>
                <h2 className="text-xl font-semibold mb-4">Etkinlik Oluştur</h2>
                <p className="text-gray-700 mb-4">Bu mekanda etkinlik oluşturmak için mekan sahibi olmalısınız.</p>
                <Link href="/panel/etkinlikler/ekle">
                  <Button className="w-full">Etkinlik Oluştur</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
