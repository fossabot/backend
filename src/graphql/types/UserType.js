const UserType = `
    scalar DateTime

    """
    A user who has signed up
    """
    type UserType {
        """
        UUID of the user
        """
        id: ID!,

        """
        Username of the user
        """
        username: String!,

        """
        Email of the user
        """
        email: String!,

        """
        If the user must change their password
        """
        must_change_password: Boolean!,

        """
        If the user is banned
        """
        is_banned: Boolean!,

        """
        The reason that the user was banned for
        """
        ban_reason: String,

        """
        If the user is verified
        """
        is_verified: Boolean!,

        """
        DateTime the user was created at
        """
        created_at: DateTime!,

        """
        DateTime the user last updated their information
        """
        updated_at: DateTime,

        """
        DateTime the user was banned at
        """
        banned_at: DateTime,

        """
        DateTime the user verified themselves
        """
        verified_at: DateTime,
    }
`;

export default UserType;
