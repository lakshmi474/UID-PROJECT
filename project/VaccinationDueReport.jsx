import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VaccinationDueReport() {
  const [days, setDays] = useState(30);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/reports/vaccinations-due', { params: { days } });
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div>
      <div className="d-flex align-items-center gap-2 mb-2">
        <h6 className="m-0">Vaccination Due Report</h6>
        <div className="ms-auto d-flex align-items-center gap-2">
          <span className="text-muted">Window</span>
          <select className="form-select form-select-sm" style={{ width: 120 }} value={days}
            onChange={(e) => setDays(Number(e.target.value))}>
            <option value={7}>7 days</option>
            <option value={30}>30 days</option>
            <option value={60}>60 days</option>
          </select>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {!loading && items.length === 0 && <div className="text-muted">No due vaccinations in this window.</div>}

      {!loading && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-sm align-middle">
            <thead>
              <tr>
                <th>Infant</th>
                <th>DOB</th>
                <th>Overdue</th>
                <th>Due Soon</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.infantId}>
                  <td>{r.name}</td>
                  <td>{new Date(r.dob).toLocaleDateString()}</td>
                  <td>
                    {r.overdue.length === 0 ? (
                      <span className="text-muted">-</span>
                    ) : (
                      r.overdue.map((v, i) => (
                        <span key={i} className="badge text-bg-danger me-1 mb-1">
                          {v.name} · {new Date(v.dueDate).toLocaleDateString()}
                        </span>
                      ))
                    )}
                  </td>
                  <td>
                    {r.dueSoon.length === 0 ? (
                      <span className="text-muted">-</span>
                    ) : (
                      r.dueSoon.map((v, i) => (
                        <span key={i} className="badge text-bg-warning text-dark me-1 mb-1">
                          {v.name} · {new Date(v.dueDate).toLocaleDateString()}
                        </span>
                      ))
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
