package course.project.springbackend.Repositories;

import course.project.springbackend.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<UserModel, Long> {
}
