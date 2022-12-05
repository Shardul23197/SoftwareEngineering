import './Table.css'

const Table = ({ data, columns, onBookClick, onCancelClick }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((item, index) => <TableHeadItem item={item} />)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => <TableRow item={item} columns={columns} onBookClick={onBookClick} onCancelClick={onCancelClick} />)}
      </tbody>
    </table>
  );
}

const TableHeadItem = ({ item }) => <th scope='col'>{item.heading}</th>
const TableRow = ({ item, columns, onBookClick, onCancelClick }) => {
  if (onCancelClick) {
    return (<tr>
              {columns.map((columnsItem, index) => {
                if (index !== columns.length-1)
                  return <td>{item[`${columnsItem.value}`]}</td>;
                
                return ''
              })}
              <td>
                <button value={item.id} onClick={onCancelClick} type="button" class="btn btn-danger">
                  Cancel
                </button>
              </td>
            </tr>);
  }
  else if (onBookClick) {
    return (<tr>
              {columns.map((columnsItem, index) => {
                if (index !== columns.length-1)
                  return <td>{item[`${columnsItem.value}`]}</td>;
                
                return ''
              })}
              <td>
                <button value={item.id} onClick={onBookClick} type="button" class="btn btn-primary">
                  Book
                </button>
              </td>
            </tr>);
  }
  else {
    return (<tr>
              {columns.map((columnsItem, index) => {
                return <td>{item[`${columnsItem.value}`]}</td>;
              })}
            </tr>);
  }
}

export default Table