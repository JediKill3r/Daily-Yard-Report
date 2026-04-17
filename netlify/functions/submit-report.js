export default async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { boardId, groupId, itemName, columnValues } = await req.json();

    const apiToken = process.env.MONDAY_API_TOKEN;
    if (!apiToken) {
      return new Response(JSON.stringify({ error: 'Missing MONDAY_API_TOKEN' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const escapedItemName = String(itemName)
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n');

    const escapedColumnValues = JSON.stringify(columnValues)
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n');

    const query = `
      mutation {
        create_item(
          board_id: ${boardId},
          group_id: "${groupId}",
          item_name: "${escapedItemName}",
          column_values: "${escapedColumnValues}"
        ) {
          id
        }
      }
    `;

    const mondayRes = await fetch('https://api.monday.com/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiToken,
      },
      body: JSON.stringify({ query }),
    });

    const result = await mondayRes.json();

    if (!mondayRes.ok || result.errors) {
      return new Response(
        JSON.stringify({
          error: result.errors?.[0]?.message || 'Failed to create item in Monday',
          details: result,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify({ ok: true, data: result.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
