import { Table } from "react-bootstrap";
import ViewButton from "./Buttons/ViewButton";
import { useTranslation } from "react-i18next";

function GenericTable ({fields, elements, viewButton, textViewButton,viewElement }) {
  const { t } = useTranslation();

  return(
    <Table style={{textAlign: 'center'}}>
      <thead>
        <tr>
          {fields.map((attribute, index)=>(
            <th key={index}>{t(attribute)}</th>
          ))}
          {viewButton && <th>{textViewButton}</th>}
        </tr>
      </thead>
      <tbody>
      {elements.map((element) => (
            <tr key={element.id}>
              {fields.map((attribute, attrIndex) => (
                <td key={attrIndex}>
                  { t(element[attribute]) }
                </td>
              ))}
              {viewButton && <td><ViewButton onClick={() => viewElement(element)} /></td>}
            </tr>
          ))}
      </tbody>
    </Table>
  )
} export default GenericTable;