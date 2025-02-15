import gql from 'graphql-tag'

gql`
  fragment FullBadgeDetails on Badge {
    id
    status
    uri
    validUntil
    account {
      id
    }
    badgeModel {
      id
      uri
      controllerType
      creatorFee
      validFor
      badgesMintedAmount
      badgeModelKleros {
        tcrList
        challengePeriodDuration
      }
    }
    badgeKlerosMetaData {
      reviewDueDate
    }
  }
`

gql`
  fragment BadgesInReview on Badge {
    id
    status
    uri
    account {
      id
    }
    badgeModel {
      id
      uri
      controllerType
      validFor
      badgeModelKleros {
        tcrList
        challengePeriodDuration
      }
    }
    badgeKlerosMetaData {
      reviewDueDate
    }
  }
`

/**
 * Small fragment to use on the explorer, to search and list all the badges in review,
 * Fetching an small amount of data speed up a little bit the time to render the list
 */

gql`
  fragment BadgeWithJustIds on Badge {
    id
    status
    uri
    account {
      id
    }
    badgeModel {
      id
      uri
      badgeModelKleros {
        tcrList
        registrationUri
      }
    }
    badgeKlerosMetaData {
      reviewDueDate
    }
  }
`

gql`
  fragment UserBadges on Badge {
    id
    uri
    status
    badgeModel {
      id
    }
    badgeKlerosMetaData {
      reviewDueDate
    }
  }
`
