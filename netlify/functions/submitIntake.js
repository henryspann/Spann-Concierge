exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    const data = JSON.parse(event.body);

    // Airtable details
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = "tbl1b8H0ysthDAeGzW";  // Intake Submissions table
    const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;

    // Payload to Airtable
    const payload = {
      fields: {
        "Name": data.name,
        "Email": data.email,
        "Phone": data.phone,
        "Vehicles Owned": data.vehicles || "",
        "Initial Request": data.request || "",
        "Urgent Tasks": data.urgent || "",
        "Preferred Contact": data.preferredContact || ""
      }
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, airtable: result }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() }),
    };
  }
};
