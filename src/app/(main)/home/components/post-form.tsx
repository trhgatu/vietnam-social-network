import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Divider } from 'antd';
import Image from 'next/image';

export function PostForm() {
    return (
        <div className='mb-4'>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className='flex items-center'>
                            <Image
                                src="https://avatar.iran.liara.run/public"
                                alt="Post image"
                                width={48}
                                height={48}
                                style={{ objectFit: "cover" }}
                                className="rounded-full"
                            />
                            <Input className='ml-2' placeholder='Bạn đang cảm thấy thế nào?'></Input>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Divider className='m-0!'/>
                </CardContent>

                <CardFooter className="flex">
                    <Button>Livestream</Button>
                    <Button>Ảnh/video</Button>
                    <Button>Cảm xúc</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
