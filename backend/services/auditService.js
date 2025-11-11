/**
 * Audit Service
 * Create audit logs for all important actions
 */

const {query} = require('../utils/database');

/**
 * Create audit log entry
 */
async function createAuditLog({
  userId,
  restaurantId,
  module,
  action,
  entityType,
  entityId,
  description,
  oldValue,
  newValue,
  ipAddress,
  userAgent,
}) {
  try {
    // Get user name
    let userName = 'System';
    if (userId) {
      const userResult = await query('SELECT name FROM users WHERE id = $1', [userId]);
      if (userResult.rows.length > 0) {
        userName = userResult.rows[0].name;
      }
    }

    await query(
      `INSERT INTO audit_logs 
       (restaurant_id, user_id, user_name, module, action, entity_type, entity_id, 
        description, old_value, new_value, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        restaurantId,
        userId,
        userName,
        module,
        action,
        entityType,
        entityId,
        description,
        oldValue ? JSON.stringify(oldValue) : null,
        newValue ? JSON.stringify(newValue) : null,
        ipAddress,
        userAgent,
      ]
    );
  } catch (error) {
    console.error('Audit log creation error:', error);
    // Don't throw - audit logging should not break main flow
  }
}

module.exports = {
  createAuditLog,
};

