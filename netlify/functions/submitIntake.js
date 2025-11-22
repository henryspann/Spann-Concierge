exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    const data = JSON.parse(event.body);
    console.log("Received form payload:", data);

    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_TABLE_ID;
    const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;

    const payload = {
      fields: {
        "Name": data.name,
        "Email": data.email,
        "Phone": data.phone,
        "Vehicles Owned": data.vehicles || "",
        "Initial Request": data.request || "",
        "Urgent Tasks": data.urgent || "",
        "Preferred Contact": data.preferredContact || "",
      }
    };

    console.log("Sending payload to Airtable:", payload);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("Airtable response:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, airtable: result }),
    };

  } catch (err) {
    console.error("Function Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() }),
    };
  }
};
