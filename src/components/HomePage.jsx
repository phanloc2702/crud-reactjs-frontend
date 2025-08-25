import eyeIcon from "../assets/img/ic-eye.png.png"
import s from "../styles/LayoutRoot.module.scss"
import removeIcon from "../assets/img/ic-remove.png"
import editIcon from "../assets/img/ic-edit.png"
import userIcon from "../assets/img/ic-user.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const ROLE = [
  { value: "dev", label: "Developer" },
  { value: "ba", label: "Bussiness Analyst" },
  { value: "tester", label: "Tester" }
]

export const COMPANY = [
  { value: "cmc", label: "CMC Global" },
  { value: "fpt", label: "FPT Software" },
  { value: "vti", label: "VTI group" }
]

export default function HomePage() {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) 

  function onRemoveUser(id) {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá người dùng này không?")
    if (!confirmDelete) return

    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      
      fetchData()
    })
  }

  function fetchData() {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setList(data))
  }

  useEffect(() => {
    fetchData()
  }, [])

  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(list.length / itemsPerPage)

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <section className={s.users}>
      <div className={s.users_title}>
        <h1>Users</h1>
        <button className={s.users_cta} onClick={() => navigate("/user/create")}>
          <span>
            <img src={userIcon} alt="" />
          </span>
          <span>Add New</span>
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Company</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((user) => {
            return (
              <tr key={user?.id}>
                <td>{user?.username}</td>
                <td>{ROLE.find((item) => item.value === user?.role)?.label}</td>
                <td>{COMPANY.find((item) => item.value === user?.company)?.label}</td>
                <td>{user?.address}</td>
                <td>
                  <button onClick={() => navigate(`/user/${user?.id}/view`)}>
                    <img src={eyeIcon} alt="" />
                  </button>
                  <button onClick={() => navigate(`/user/${user?.id}/edit`)}>
                    <img src={editIcon} alt="" />
                  </button>
                  <button onClick={() => onRemoveUser(user?.id)}>
                    <img src={removeIcon} alt="" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={s.pagination}>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? s.activePage : ""}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </section>
  )
}
