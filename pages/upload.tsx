import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

import useAuthStore from '../store/authStore'
import { client } from '../utils/client'

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [videoAsset, setVideoAsset] = useState()

    return (
        <div className="flex w-full h-full">
            <div className="bg-white rounded-lg">
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
                                    </label>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload