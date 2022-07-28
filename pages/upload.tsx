import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { SanityAssetDocument } from '@sanity/client'
import { BASE_URL } from '../utils'

import useAuthStore from '../store/authStore'
import { client } from '../utils/client'

import { topics } from '../utils/constants'

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
    const [wrongFileType, setWrongFileType] = useState(false)
    const [caption, setCaption] = useState('')
    const [category, setCategory] = useState(topics[0].name)
    const [savingPost, setSavingPost] = useState(false)
    const router = useRouter()

    const { userProfile }: { userProfile: any } = useAuthStore() 

    const uploadVideo = async(e: any) => {
        const selectedFile = e.target.files[0]
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

        if(fileTypes.includes(selectedFile.type)) {
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            }).then((data) => {
                setVideoAsset(data)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
            setWrongFileType(true)
        }
    }

    const handlePost = async () => {
        if(caption && videoAsset?._id && category) {
            setSavingPost(true)

            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            }

            await axios.post(`${BASE_URL}/api/posts`, document)
            router.push('/')
        }
    }

    return (
        <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
            <div className="bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
                <div>
                    <div>
                        <p className="font-bold text-2xl">
                            Upload Video
                        </p>
                        <p className="mt-1 text-md text-gray-400">
                            Post your Video!
                        </p>
                    </div>
                    <div 
                        className="border-dashed rounded-xl flex 
                        flex-col justify-center items-center 
                        outline-none mt-10 w-[260px] h-[460px] 
                        border-4 border-gray-200 p-10
                        cursor-pointer hover:border-red:300
                        hover:bg-gray-100"
                    >
                        {isLoading ? (
                            <p>
                                Uploading...
                            </p>
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div>
                                        <video
                                            src={videoAsset?.url}
                                            loop
                                            controls
                                            className="rounded-xl h-[45px] mt-16 bg-black"
                                        >
                                        </video>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="font-bold text-xl">
                                                    <FaCloudUploadAlt 
                                                        className="text-gray-300 text-6xl"
                                                    />
                                                </p>
                                                <p className="text-xl font-semibold">
                                                    Upload Video
                                                </p>
                                            </div>
                                            <p className="text-gray-400 text-center mt-10 text- sm leading-8">
                                                MP4 / WEBM / OGG <br />
                                                720x1280 or higher <br />
                                                Up to 10 minutes <br />
                                                Less than 2GB
                                            </p>
                                            <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                                                Select File
                                            </p>
                                        </div>
                                        <input 
                                            type="file"
                                            name="upload-video"
                                            className="w-0 h-0"
                                            onChange={uploadVideo}
                                        />
                                    </label>
                                )}
                            </div>
                        )}
                        {wrongFileType && (
                            <p className="text-center mt-4 text-red-400 font-semibold text-xl">
                                Please upload vaild video type.
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-3 pb-10">
                    <label className="text-md font-medium">
                        Caption
                    </label>
                    <input 
                        type="text"
                        value=""
                        onChange={(e) => setCaption(e.target.value)}
                        className="rounded outline-none text-md border-2 border-gray-200 p-2"
                    />
                    <label className="text-md font-medium">
                        Choose a Category
                    </label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                    >
                        {topics.map((topic) => (
                            <option 
                                key={topic.name} 
                                className="outline-none capitalize text-gray-800 
                                bg-white text-md hover:bg-slate-300 p-2"
                            >
                                {topic.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-6 mt-10">
                        <button
                            onClick={() => {}}
                            type="button"
                            className="border-gray-300 border-2 text-md
                            font-medium p-2 rounded outline-none
                            w-28 lg:w-44 "
                        >
                            Discard
                        </button>
                        <button
                            onClick={handlePost}
                            type="button"
                            className="bg-[#F51997] text-md text-white
                            font-medium p-2 rounded outline-none
                            w-28 lg:w-44 "
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload