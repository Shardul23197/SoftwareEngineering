import './Table.css'

const Table = ({ data, column, onBookClick}) => {
  return (
    <table>
      <thead>
        <tr>
          {column.map((item, index) => <TableHeadItem item={item} />)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => <TableRow item={item} column={column} onBookClick={onBookClick} />)}
      </tbody>
    </table>
  )
}

const TableHeadItem = ({ item }) => <th>{item.heading}</th>
const TableRow = ({ item, column, onBookClick }) => (
  <tr>
    {column.map((columnItem, index) => {
      return <td>{item[`${columnItem.value}`]}</td>
      })}
    <td>
      <button value={item.id} onClick={onBookClick} type="button" class="btn btn-primary">
        Book
      </button>
    </td>
  </tr>
)

export default Table