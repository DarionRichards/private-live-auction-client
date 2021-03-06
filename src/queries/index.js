import {gql} from "@apollo/client";

export const DASHBOARD = gql`
	query Query {
		dashboard {
			id
			firstName
			lastName
			username
			email
		}
	}
`;

export const GET_USER = gql`
	query Query($userId: ID!) {
		getSingleUser(userId: $userId) {
			id
			username
			firstName
			lastName
			email
			isAdmin
			savedListings {
				_id
				title
				description
				startingBid
				reserveAmount
				status
			}
		}
	}
`;

export const GET_LISTINGS = gql`
	query GetListings($status: String) {
		getListings(status: $status) {
			_id
			title
			description
			propertyType
			reserveAmount
			startingBid
			status
			bedrooms
			bathrooms
			createdBy {
				username
				id
			}
			createdAt
			updatedAt
			googleMapUrl
			keyFeatures
			images
			currentBid {
				amount
				user {
					id
					firstName
					lastName
					imageUrl
					username
				}
				listingId
			}
			bids {
				amount
				user {
					username
					id
					lastName
					firstName
					imageUrl
				}
				listingId
			}
		}
	}
`;

export const GET_SINGLE_LISTING = gql`
	query GetSingleListing($id: ID!) {
		getSingleListing(_id: $id) {
			_id
			title
			description
			propertyType
			reserveAmount
			startingBid
			status
			bedrooms
			bathrooms
			createdBy {
				id
				username
				firstName
				lastName
			}
			createdAt
			updatedAt
			googleMapUrl
			keyFeatures
			images
			currentBid {
				amount
				user {
					id
					username
					firstName
					lastName
					imageUrl
					email
				}
				bidTime
			}
			bids {
				amount
				user {
					id
					username
					firstName
					lastName
					imageUrl
					email
				}
				listingId
				bidTime
			}
		}
	}
`;

export const CATEGORY = gql`
	query Query {
		getAllCategories {
			_id
			title
		}
	}
`;
