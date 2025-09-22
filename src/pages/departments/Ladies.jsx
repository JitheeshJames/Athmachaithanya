export default function Ladies() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Ladies Department</h1>
      <p className="mb-6 text-gray-700">
        The Ladies Department focuses on empowering women through prayer meetings,
        charity initiatives, and fellowship programs.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Committee Members</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Mary Joseph – President</li>
          <li>Annie Mathew – Secretary</li>
          <li>Leena Varghese – Treasurer</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Fund Details</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Income</th>
              <th className="p-2 border">Expense</th>
              <th className="p-2 border">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">01-Sep-2025</td>
              <td className="p-2 border">₹10,000</td>
              <td className="p-2 border">₹3,000</td>
              <td className="p-2 border">₹7,000</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Activities & Updates</h2>
        <p className="text-gray-700">
          Weekly prayer meetings, charity visits, and community outreach programs.
        </p>
      </section>
    </div>
  );
}
