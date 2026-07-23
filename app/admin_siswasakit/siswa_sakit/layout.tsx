import Sidebar from "@/app/components/siswa_sakit/SideBar";

export default function AdminLayout({
children,
}:{
children:React.ReactNode
}){

return(

<div className="flex">

<Sidebar/>

<main className="flex-1 p-8 bg-gray-100">

{children}

</main>

</div>

)

}