import React, { useState, useEffect, useRef } from 'react'
import { Video } from '../types'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'

interface IProps {
    post: Video
}

const VideoCard: NextPage <IProps> = ({ post }) => {
    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6">
            <div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default VideoCard