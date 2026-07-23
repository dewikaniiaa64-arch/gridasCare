import Link from "next/link";

export default function Sidebar(){

return(

<aside className="w-60 bg-sky-300 min-h-screen p-5">

<h1 className="text-3xl font-bold text-red-500">
gridasCare
</h1>

<Link href="/admin">

<button
className="bg-[#2C4153] text-white rounded-lg py-3 w-full mt-8">
Riwayat Siswa
</button>

</Link>

</aside>

)

}