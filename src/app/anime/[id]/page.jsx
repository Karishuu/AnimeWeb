"use client"
import VideoPlayer from "@/components/Utilities/VideoPlayer"
import { getAnimeResponse } from "@/libs/api-libs"
import Image from "next/image"
import React from "react"
import CollectionButton from "@/components/AnimeList/CollectionButton"
import { authUserSession } from "@/libs/auth-libs"
const Page = async ({ params: {id } }) => {
    const anime = await getAnimeResponse(`anime/${id}`)
    const user = await authUserSession();
    const genre = await anime.data.genres
    console.log({genre})
    // console.log({anime})
    return (
        <>
        <div className="pt-4 px-4">
            <h3 className="text-2xl text-color-primary">{anime.data.title} - {anime.data.year}</h3>
            <CollectionButton anime_mal_id={id} user_email={user?.email}/>
        </div>
        <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto">
            <div className="w-36 flex flex-col p-2 justify-center items-center rounded border border-color-primary">
            <h3>PERINGKAT</h3>
            <p>{anime.data.rank}</p>
            </div>
            <div className="w-36 flex flex-col p-2 justify-center items-center rounded border border-color-primary">
            <h3>SCORE</h3>
            <p>{anime.data.score}</p>
            </div>
            <div className="w-36 flex flex-col p-2 justify-center items-center rounded border border-color-primary">
            <h3>EPISODE</h3>
            <p>{anime.data.episodes}</p>
            </div>
        </div>
        <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-2 text-color-primary">
            <Image 
                src={anime.data.images.webp.image_url}
                alt={anime.data.images.jpg.image_url}
                width={250}
                height={250}
                className="w-full rounded object-cover"
                />
                <div className="justify-center items-center">
                <div className="w-45 h-12 flex flex-col p-2 justify-center items-center rounded border border-color-primary">
            <h3 className="font-bold gap-2">Genre</h3>
            <ul className="flex flex-col-2 gap-2">{genre.map(item => (<h3 key={item}>{item.name}</h3>))}</ul>
            </div>
                </div>
                <p className="text-justify text-xl">{anime.data.synopsis}</p>
        </div>
        <div>
            <VideoPlayer youtubeId={anime.data.trailer.youtube_id}/>
        </div>
        </>
    )
}

export default Page