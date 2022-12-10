// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdInvest {
    struct Project {
        address founder;
        string title;
        string description;
        uint256 goal;
        uint256 deadline;
        uint256 balance;
        string image;
        address[] investors;
        uint256[] investment;
    }
    mapping(uint256 => Project) public projects;

    uint256 public projectCount = 0;

    function createProject(address _founder,
        string memory _title,
        string memory _description,
        uint256 _goal,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256){
        Project storage project = projects[projectCount];

        require(project.deadline < block.timestamp, "The deadline should be date in the future!");

        project.founder = _founder;
        project.title = _title;
        project.description = _description;
        project.goal = _goal;
        project.deadline = _deadline;
        project.image = _image;
        project.balance = 0;
        projectCount++;

        return projectCount;
    }

    function investToProject(uint256 _id) public payable {
        uint256 amount = msg.value;
        Project storage project = projects[_id];

        project.investors.push(msg.sender);
        project.investment.push(amount);

        (bool sent,) = payable(project.founder).call{value: amount}("");

        if(sent){
            project.balance += amount;
        }
    }

    function getInvestors(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (projects[_id].investors, projects[_id].investment);
    }

    function getProjects() public view returns (Project[] memory){
        Project[] memory result = new Project[](projectCount);

        for(uint i = 0; i < projectCount; i++){
            Project storage item = projects[i];
            result[i] = item;
        }

        return result;
    }
}