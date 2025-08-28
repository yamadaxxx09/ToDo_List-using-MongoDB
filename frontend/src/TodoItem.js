const item = {
  display:'flex', alignItems:'center', justifyContent:'space-between', gap:12,
  padding:'12px 14px', border:'1px solid #e2e8f0', borderRadius:16,
  background:'#fff'
};
const textStyle = { color:'#0f172a' };
const delBtn = {
  padding:'8px 12px', border:'1px solid #e2e8f0', borderRadius:12,
  background:'#0b1f5e', color:'#e9efff', cursor:'pointer'
};

export default function TodoItem({ todo, onDelete }) {
  return (
    <li style={item}>
      <span style={textStyle}>{todo.text}</span>
      <button style={delBtn} onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
}
