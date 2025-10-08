import React from 'react';

export default function InfantTable({ items, loading, onEdit, onDelete, page, pages, onPage }) {
  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Height (cm)</th>
              <th>Weight (kg)</th>
              <th>Head Circ (cm)</th>
              <th style={{ width: 150 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && items.map((it) => (
              <tr key={it._id}>
                <td>{it.name}</td>
                <td>{new Date(it.dob).toLocaleDateString()}</td>
                <td>{it.gender}</td>
                <td>{it.latestHeightCm ?? '-'}</td>
                <td>{it.latestWeightKg ?? '-'}</td>
                <td>{it.latestHeadCircumferenceCm ?? '-'}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-primary" onClick={() => onEdit(it)}>Edit</button>
                    <button className="btn btn-outline-danger" onClick={() => onDelete(it._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan="7" className="text-center">Loading...</td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">No records</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="btn-group">
          <button className="btn btn-outline-secondary btn-sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
          <button className="btn btn-outline-secondary btn-sm" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next</button>
        </div>
        <small className="text-muted">Page {page} of {pages}</small>
      </div>
    </div>
  );
}
