"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Clock } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import VenueRating from "@/components/venue-rating"
import { useEffect, useState } from "react"

// Örnek mekan verileri
const DUMMY_VENUES = [
  {
    id: "1",
    name: "Cafe Isparta",
    address: "Merkez, Isparta",
    phone: "0246 123 45 67",
    openingHours: "09:00 - 23:00",
    description: "Isparta'nın merkezinde şık bir kafe.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    rating: 4.5,
    ratingCount: 28,
    ownerEmail: "ahmet@example.com",
    comments: [],
    menu: [],
    upcomingEvents: [],
  },
  {
    id: "2",
    name: "Gül Restaurant",
    address: "Çünür, Isparta",
    phone: "0246 234 56 78",
    openingHours: "11:00 - 22:00",
    description: "Geleneksel lezzetlerin modern sunumu.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    rating: 4.2,
    ratingCount: 42,
    ownerEmail: "ayse@example.com",
    comments: [],
    menu: [],
    upcomingEvents: [],
  },
  {
    id: "3",
    name: "Isparta Kültür Merkezi",
    address: "Modernevler, Isparta",
    phone: "0246 345 67 89",
    openingHours: "10:00 - 20:00",
    description: "Kültürel etkinlikler için ideal mekan.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    rating: 4.8,
    ratingCount: 15,
    ownerEmail: "kultur@example.com",
    comments: [],
    menu: [],
    upcomingEvents: [],
  },
  {
    id: "4",
    name: "Isparta Sanat Galerisi",
    address: "Bahçelievler, Isparta",
    phone: "0246 456 78 90",
    openingHours: "10:00 - 18:00",
    description: "Sanat eserleri ve sergiler.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    rating: 4.0,
    ratingCount: 10,
    ownerEmail: "sanat@example.com",
    comments: [],
    menu: [],
    upcomingEvents: [],
  },
]

export default function VenuesPage() {
  const [allVenues, setAllVenues] = useState(DUMMY_VENUES)
  const [sortBy, setSortBy] = useState("recommended")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const myVenuesStr = localStorage.getItem("myVenues")
      let myVenues = []
      if (myVenuesStr) {
        myVenues = JSON.parse(myVenuesStr)
      }
      setAllVenues([...DUMMY_VENUES, ...myVenues])
    }
  }, [])

  // Sıralama işlemi
  let sortedVenues = [...allVenues]
  if (sortBy === "rating") {
    sortedVenues.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  } else if (sortBy === "alphabetical") {
    sortedVenues.sort((a, b) => a.name.localeCompare(b.name))
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mekanlar</h1>
          <p className="text-gray-600">Isparta'daki tüm mekanları keşfedin</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input placeholder="Mekan ara..." className="w-full" />
          </div>
          <Select value={sortBy} onValueChange={setSortBy} defaultValue="recommended">
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sıralama</SelectLabel>
                <SelectItem value="recommended">Önerilen</SelectItem>
                <SelectItem value="rating">Puana Göre</SelectItem>
                <SelectItem value="alphabetical">Alfabetik</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedVenues.map((venue) => (
          <Card key={venue.id} className="flex flex-col h-full">
            <img
              src={venue.imageUrl || "/placeholder.svg"}
              alt={venue.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{venue.name}</CardTitle>
              <CardDescription>{venue.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pb-2 flex-grow">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span>{venue.address}</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span>{venue.phone}</span>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span>{venue.openingHours}</span>
              </div>
              <div className="flex items-center mt-2">
                <VenueRating rating={venue.rating ?? 0} ratingCount={venue.ratingCount ?? 0} />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Link href={`/mekanlar/${venue.id}`} className="w-full">
                <Button className="w-full">Detayları Gör</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
