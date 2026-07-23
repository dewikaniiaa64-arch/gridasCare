const data=[
{
nama:"Ayrani",
kelas:"XI PPLG 2",
keluhan:"Pusing",
tanggal:"11/05/2027",
penanganan:"Paracetamol"
},
{
nama:"Nabila",
kelas:"XI PPLG 3",
keluhan:"Mual",
tanggal:"12/05/2027",
penanganan:"Istirahat"
}
]

export default function SiswaTable(){

return(

<table className="w-full border">

<thead className="bg-sky-100">

<tr>

<th>No</th>
<th>Nama</th>
<th>Kelas</th>
<th>Keluhan</th>
<th>Tanggal</th>
<th>Penanganan</th>

</tr>

</thead>

<tbody>

{data.map((item,index)=>(

<tr key={index}>

<td>{index+1}</td>

<td>{item.nama}</td>

<td>{item.kelas}</td>

<td>{item.keluhan}</td>

<td>{item.tanggal}</td>

<td>{item.penanganan}</td>

</tr>

))}

</tbody>

</table>

)

}