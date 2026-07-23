import SearchBar from "@/app/components/siswa_sakit/SearchBar";
import SiswaTable from "@/app/components/siswa_sakit/SiswaTable";

export default function Admin(){

return(

<div className="bg-white rounded-xl shadow-lg p-6">

<h1 className="text-3xl font-bold text-[#2C4153] mb-5">
Riwayat Siswa Sakit
</h1>

<SearchBar/>

<SiswaTable/>

</div>

)

}