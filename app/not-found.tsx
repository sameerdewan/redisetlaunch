"use client";
import Image from "next/image";
import localFont from "next/font/local";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const cheGuevaraBarryBrown = localFont({src: '../components/cheGuevaraBarryBrown.ttf'});

export default function NotFound() {
    // Navigation
    const router = useRouter();

    // Returned UI
    return (
        <div className='bg-[#F4FFFF] min-h-screen'>
            <div className='flex justify-center'>
                <div className='text-center'>
                    <Image
                        src='/notfound.jpeg'
                        alt='Not Found'
                        width={400}
                        height={400}
                        className='mt-8'
                    />
                    <span className={cn(cheGuevaraBarryBrown.className, 'text-3xl text-[#101B35] block')}>
                        Not Found
                    </span>
                    <Button className='bg-[#101B35]' onClick={() => router.push('/')}>Back Home</Button>
                </div>
            </div>
        </div>
    );
}