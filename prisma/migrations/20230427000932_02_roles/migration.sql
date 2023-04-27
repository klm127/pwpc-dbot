INSERT INTO "MemberRole" ("roleName", "roleDescription", "accessLevel")
VALUES
('President', '- Has overall responsibility of the club. \n - Organizes member meetings and activities that occur throughout the year. \n - Calls and presides at all regular and special meetings.', 'admin' ),
('Vice President', '- Performs the duties of the president in his/her absence, inability to serve, or at his/her call.\n- Assists president in coordinating member meetings and activities.\n- Shares joint responsibility with the secretary for social media & communication.', 'admin'),
('Secretary', '- Keeps a record of all attending members and their activity status. \n- Keeps full minutes of every meeting. \n- Shares joint responsibility with the Vice President for social media & communication.', 'mod'),
('Treasurer', '- Is responsible for the supervision of the clubs financing. \n- Is responsible for coordinating the preparation of the annual budget packet.', 'mod'),
('Member', '- A club member; a student who has completed the membership requirements.\n - Counts towards quorum. \n- Participates in member-wide votes.', 'member'),
('Officer', '- An officer; on the board of directors. \n- Participates in certain officer-only votes.', 'mod'),
('Prospective Member', '- A student who is not yet a member.', 'guest'),
('Guest', '- A non-member who is not joining the club.', 'guest'),
('Alumni', '- One who was previously a member of the club, but graduated or otherwise left.', 'guest');