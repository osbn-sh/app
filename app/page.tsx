"use client"

import { MorphingText } from "@/components/ui/morphing-text"
import { KineticText } from "@/components/ui/kinetic-text"
import { SparklesText } from "@/components/ui/sparkles-text"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"
import { ListOrdered, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardItrationView, ICardItrationData } from "@/components/osbn/cardItreation"
import { OSBN } from "@/iconjsx/logo"



export default function Page() {

    const CardData: ICardItrationData = {
        detail: {
            category: 'نتایج',
            data: [
                { title: 'محمد رضا یمقانی', button: { url: 'yamaghani', name: 'یمقانی' } },
                { title: 'سید علی حسینی', button: { url: 'hoseyni', name: 'حسینی' } },
                { title: 'رضا کریمی', button: { url: 'karimi', name: 'کریمی' } },
                { title: 'مریم رضایی', button: { url: 'rezaei', name: 'رضایی' } },
                { title: 'احمد نوری', button: { url: 'nouri', name: 'نوری' } },
                { title: 'زهرا موسوی', button: { url: 'mousavi', name: 'موسوی' } },
                { title: 'علیرضا صادقی', button: { url: 'sadeghi', name: 'صادقی' } },
                { title: 'فاطمه محمدی', button: { url: 'mohammadi', name: 'محمدی' } },
                { title: 'حسن تقوی', button: { url: 'taghavi', name: 'تقوی' } },
                { title: 'نگین حسنی', button: { url: 'hasani', name: 'حسنی' } },
                { title: 'مهدی عابدی', button: { url: 'abedi', name: 'عابدی' } },
                { title: 'سمیه کاظمی', button: { url: 'kazemi', name: 'کاظمی' } },
                { title: 'پیمان قاسمی', button: { url: 'ghasemi', name: 'قاسمی' } },
                { title: 'لیلا جعفری', button: { url: 'jafari', name: 'جعفری' } },
                { title: 'امیر رحمانی', button: { url: 'rahmani', name: 'رحمانی' } },
                { title: 'نرگس احمدی', button: { url: 'ahmadi', name: 'احمدی' } },
                { title: 'بهرام فتحی', button: { url: 'fathi', name: 'فتحی' } },
                { title: 'الهه مرادی', button: { url: 'moradi', name: 'مرادی' } },
                { title: 'کیوان سلطانی', button: { url: 'soltan', name: 'سلطانی' } },
                { title: 'سارا امینی', button: { url: 'amini', name: 'امینی' } }
            ],
        }
    }

    return (
        <>

            <div className="flex justify-between px-4 lg:px-0 lg:w-7/12 flex-wrap mx-auto">


                <div className="flex items-center max-h-20 w-full">


                    <div className="h-full -translate-y-4 w-8 animate-wiggle">
                        <OSBN />
                    </div>

                    <h1 className="mb-10 mt-4 font-black text-2xl flex items-end gap-x-4">
                        <SparklesText>
                            استادبان
                        </SparklesText>

                        <span className="opacity-80">

                            در خدمت شماست

                        </span>
                    </h1>
                </div>

                <Input className="w-full h-10" placeholder="جست و جو بین دانشگاه ها ، اساتید ، رشته ها و دروس " />


                <div className="flex gap-x-2 my-2 w-auto">
                    <Select>
                        <SelectTrigger className="">
                            <ListOrdered />
                            <SelectValue placeholder="الفبا" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="الفبا">الفبا</SelectItem>
                                <SelectItem value="نمره">نمره</SelectItem>
                                <SelectItem value="بازدید">بازدید</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>


                    <Toggle dir={'rtl'}>دانشگاه</Toggle>
                    <Toggle dir={'rtl'}>رشته</Toggle>
                    <Toggle dir={'rtl'}>استاد</Toggle>
                    <Toggle dir={'rtl'}>درس</Toggle>
                </div>



                <div className="my-2 ">
                    <Button className="px-4">
                        <Search />
                        جست و جو
                    </Button>
                </div>
            </div>



            <div className=" lg:w-7/12 mx-auto">
                <CardItrationView detail={CardData.detail} />
            </div>

        </>

    )
}




